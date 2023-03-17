import { HashTable } from "./implementation";

describe("Hash table test cases", () => {

  test("allows to set and get values", () => {
    // Arrange
    const table = new HashTable();
    const items = [
      {
        key: "key1",
        value: "value1",
      },
      {
        key: "key2",
        value: "value2",
      },
      {
        key: "key3",
        value: 150,
      },
      {
        key: "key4",
        value: {
          test: "lol",
        },
      },
      {
        key: "key5",
        value: null,
      },
    ];

    // Act
    items.map(({ key, value }) => table.set(key, value));

    // Assert
    items.forEach(({ key, value }) => {
      expect(table.has(key)).toBeTruthy();
      expect(table.get(key)).toStrictEqual(value);
    });
  });

  test("allows to limit maximum number of possible hash values", () => {
    // Arrange
    const maxCapacity = 10;
    const table = new HashTable(maxCapacity);
    const items = [
      {
        key: "key1",
        value: "value1",
      },
      {
        key: "key2",
        value: "value2",
      },
      {
        key: "key3",
        value: 150,
      },
      {
        key: "key4",
        value: {
          test: "lol",
        },
      },
      {
        key: "key5",
        value: null,
      },
      {
        key: "key6",
        value: "value1",
      },
      {
        key: "key7",
        value: "value2",
      },
      {
        key: "key8",
        value: 150,
      },
      {
        key: "key9",
        value: {
          test: "lol",
        },
      },
      {
        key: "key10",
        value: null,
      },
      {
        key: "key11",
        value: {
          test: "lol",
        },
      },
      {
        key: "key12",
        value: null,
      },
    ];

    // Act
    // Assert
    items.forEach(({ key }) => {
      const hash = table.hash(key);
      expect(hash).toBeLessThan(maxCapacity);
    });
  });

  test("allows to delete values", () => {
    // Arrange
    const table = new HashTable(10);
    const items = [
        {
          key: "key1",
          value: "value1",
        },
        {
          key: "key2",
          value: "value2",
        },
        {
          key: "key3",
          value: 150,
        },
        {
          key: "key4",
          value: {
            test: "lol",
          },
        },
        {
          key: "key5",
          value: null,
        },
    ];

    // Act
    const key1 = items[0].key;
    const key2 = items[1].key;

    items.forEach(({ key, value }) => {
        table.set(key, value);
    });

    const res1 = table.delete(key1);
    const res2 = table.delete(key2);

    // Assert
    expect(res1).toBeTruthy();
    expect(table.has(key1)).toBeFalsy();
    expect(table.delete(key1)).toBeFalsy();
    expect(table.get(key1)).toBeUndefined();

    expect(res2).toBeTruthy();
    expect(table.has(key2)).toBeFalsy();
    expect(table.delete(key2)).toBeFalsy();
    expect(table.get(key2)).toBeUndefined();
  });

  test('returns number of inserted values', () => {
    // Arrange
    const table = new HashTable(10);
    const items = [
        {
          key: "key1",
          value: "value1",
        },
        {
          key: "key2",
          value: "value2",
        },
        {
          key: "key3",
          value: 150,
        },
        {
          key: "key4",
          value: {
            test: "lol",
          },
        },
        {
          key: "key5",
          value: null,
        },
    ];

    // Act
    // Assert
    expect(table.size).toBe(0);
    items.forEach(({ key, value }) => table.set(key, value));
    expect(table.size).toBe(5);
    table.delete(items[0].key);
    expect(table.size).toBe(4);
  });
  
  test("allows to remove all values at once", () => {
    // Arrange
    const table = new HashTable(10);
    const items = [
        {
          key: "key1",
          value: "value1",
        },
        {
          key: "key2",
          value: "value2",
        },
        {
          key: "key3",
          value: 150,
        },
        {
          key: "key4",
          value: {
            test: "lol",
          },
        },
        {
          key: "key5",
          value: null,
        },
    ];
    items.forEach(({ key, value }) => table.set(key, value));

    // Act
    table.clear();

    // Assert
    expect(table.size).toBe(0);
    expect(table.has(items[0].key)).toBeFalsy();
    expect(table.get(items[0].key)).toBeUndefined();
  });
});
